const Gradient: React.FC = () => {
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl transform -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl transform translate-y-1/2" />
            </div>
        </>
    );
};

export default Gradient;
