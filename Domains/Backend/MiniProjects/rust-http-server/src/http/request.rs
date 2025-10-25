use super::response::HttpResponse;
use std::{collections::HashMap, fmt::Display, io, str::FromStr};

#[derive(Debug)]
pub struct HttpRequest {
    method: Method,
    pub resource: Resource,
    version: Version,
    headers: HttpHeader,
    pub request_body: String,
}

impl HttpRequest {
    pub fn response(&self) -> io::Result<HttpResponse> {
        HttpResponse::new(self)
    }
    pub fn new(request: &str) -> io::Result<HttpRequest> {
        let method: Method = Method::new(request);
        let resource: Resource = Resource::new(request).unwrap_or(Resource {
            path: String::new(),
        });
        let version: Version = Version::new(request)
            .map_err(|err| io::Error::new(io::ErrorKind::InvalidData, err.msg))?;
        let headers: HttpHeader = HttpHeader::new(request).unwrap_or(HttpHeader {
            headers: HashMap::new(),
        });
        let request_body: String = if let Some((_header, body)) = request.split_once("\r\n\r\n") {
            body.to_string()
        } else {
            String::new()
        };

        Ok(HttpRequest {
            method,
            resource,
            version,
            headers,
            request_body,
        })
    }
}

#[derive(Debug)]
struct HttpHeader {
    headers: HashMap<String, String>,
}

impl HttpHeader {
    pub fn new(request: &str) -> Option<HttpHeader> {
        let mut httpheader = HttpHeader {
            headers: HashMap::new(),
        };
        let (_, header_str) = request.split_once("\r\n")?;
        for split in header_str.split_terminator("\r\n") {
            if split.is_empty() {
                break;
            }
            let (header, value) = split.split_once(":")?;
            httpheader
                .headers
                .insert(header.trim().to_string(), value.trim().to_string());
        }

        Some(httpheader)
    }
}

#[derive(Debug)]
pub enum Version {
    V1_1,
    V2_0,
}

impl Display for Version {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let msg = match self {
            Version::V1_1 => "HTTP/1.1",
            Version::V2_0 => "HTTP/2",
        };
        write!(f, "{}", msg)
    }
}

#[derive(Debug)]
pub struct VersionError {
    msg: String,
}

impl Display for VersionError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.msg)
    }
}

impl Version {
    pub fn new(request: &str) -> Result<Self, VersionError> {
        Version::from_str(request)
    }
}

impl FromStr for Version {
    type Err = VersionError;

    fn from_str(request: &str) -> Result<Self, Self::Err> {
        let request_split = request.split_once("\r\n");
        if let Some((method_line, _rest)) = request_split {
            let splits = method_line.split_ascii_whitespace();
            for split in splits {
                match split {
                    "HTTP/1.1" => return Ok(Version::V1_1),
                    "HTTP/2" | "HTTP/2.0" => return Ok(Version::V2_0),
                    _ => {}
                }
            }
        }
        Err(VersionError {
            msg: format!("Unknown protocol version in {}", request),
        })
    }
}

#[derive(Debug)]
pub enum Method {
    Get,
    Post,
    Uninitialised,
}

impl Method {
    pub fn new(request: &str) -> Method {
        let request_split = request.split_once("\r\n");
        if let Some((method_line, _rest)) = request_split {
            let method_line: Option<(&str, &str)> = method_line.split_once(" ");
            if let Some((method, _rest)) = method_line {
                return match method {
                    "GET" => Method::Get,
                    "POST" => Method::Post,
                    _ => Method::Uninitialised,
                };
            };
        };
        Method::Uninitialised
    }

    pub fn identify(s: &str) -> Method {
        match s {
            "GET" => Method::Get,
            "POST" => Method::Post,
            _ => Method::Uninitialised,
        }
    }
}

#[derive(Debug)]
pub struct Resource {
    pub path: String,
}

impl Resource {
    pub fn new(request: &str) -> Option<Resource> {
        if let Some((request_method, _)) = request.split_once("\r\n") {
            let (method, rest) = request_method.split_once(" ")?;
            return match Method::identify(method) {
                Method::Get | Method::Post => {
                    let (resource, _protocol_version) = rest.split_once(" ")?;
                    let resource = resource.trim_start_matches("/");
                    return Some(Resource {
                        path: resource.to_string(),
                    });
                }
                Method::Uninitialised => None,
            };
        };
        None
    }
}