export default function FlashMessage({ className, message = "" }) {
    return (
        <>
            <div
                className={`flex bg-green-100 rounded text-center p-4 mb-4 text-sm text-green-700 ${className}`}
            >
                <div className="flex-1">{message}</div>
            </div>
        </>
    );
}
