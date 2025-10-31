const Ping = () => {
    return (
        <div className="relative">
            <div className="absolute -left-4 top-1">
                <span className="flex size-[11px]">
                    <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#02ADFE] opacity-75"></span>
                    <span className="relative inline-flex size-[11px] rounded-full bg-[#02ADFE]"></span>
                </span>
            </div>
        </div>
    );
};

export default Ping;