const errorHandler = (err,req,res,next) => {
    const status = res.status? res.status : 500;
    res.status(status);
    res.json({
        message: err.message
    })
}

export default errorHandler;