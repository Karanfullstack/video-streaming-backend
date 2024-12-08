export const asynHandler = (reuestHandler) => {
    return async (req, res, next) => {
        try {
            await Promise.resolve(reuestHandler(req, res, next));
        } catch (error) {
            const statusCode = error.statusCode || 500;
            const errorMessage = error.message || "Iternal Server Error";
            res.status(statusCode).json({
                success: false,
                error: errorMessage,
                stack: process.env.NODE_ENV === "dev" ? error.stack : null,
            });
        }
    };
};
