use std::{
    io::{self, Read, Write},
    net::{Ipv4Addr, SocketAddr, TcpListener, TcpStream},
    thread,
};

use rust_http_server::http::request;

fn create_socket() -> SocketAddr {
    SocketAddr::from((Ipv4Addr::LOCALHOST, 5500))
}


fn handle_client(stream: &mut TcpStream) -> io::Result<()> {
    let mut buffer = [0; 1024];
    let _n = stream.read(&mut buffer)?;

    let buf_str = String::from_utf8_lossy(&buffer);
    let request = request::HttpRequest::new(&buf_str)?;
    let response = request.response()?;

    println!("{:?}", &response);
    println!("{}", &response.response_body);

    let body = response.response_body;
    stream.write_all(body.as_bytes())?;
    stream.flush()?;
    Ok(())
}

fn serve(socket: SocketAddr) -> io::Result<()> {
    let listener = TcpListener::bind(socket)?;
    let mut counter: usize = 0;

    for stream_res in listener.incoming() {
        match stream_res {
            Ok(mut stream) => {
                counter += 1;
                println!("\nConnected stream... {}", counter);
                thread::spawn(move || {
                    if let Err(e) = handle_client(&mut stream) {
                        eprintln!("client handler error: {}", e);
                    }
                });
            }
            Err(e) => {
                eprintln!("failed to accept connection: {}", e);
            }
        }
    }
    Ok(())
}

fn main() -> io::Result<()> {
    let socket: SocketAddr = create_socket();
    serve(socket)?;
    Ok(())
}
