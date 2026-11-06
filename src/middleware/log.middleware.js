const logMiddleware = (req, res, next) =>{
    const timeStart = date.now()

    res.on("finish", () => {
        const timeEnd = Date.now()

        console.log({timeStart,
            timeEnd,
            duration : (timeEnd - timeStart) + " ms",
        })
    })

    next()
}

export default logMiddleware