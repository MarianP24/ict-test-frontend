"use client";

export default function ConfirmationModal({
                                              isOpen,
                                              onClose,
                                              onConfirm,
                                              title,
                                              message,
                                              confirmButtonText = "Confirm",
                                              confirmButtonColor = "blue",
                                              icon = null,
                                              children
                                          }) {
    if (!isOpen) return null;

    const getButtonColorClasses = (color) => {
        const colors = {
            blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
            red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
            green: "bg-green-600 hover:bg-green-700 focus:ring-green-500"
        };
        return colors[color] || colors.blue;
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-600/80 overflow-y-auto h-full w-full z-40"/>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white shadow-xl p-6 rounded-lg max-w-md w-full mx-4">
                    <div className="flex items-start mb-4">
                        {icon && (
                            <div className="flex-shrink-0 mr-3">
                                <div
                                    className={`h-8 w-8 rounded-full ${icon.bgColor} flex items-center justify-center`}>
                                    {icon.svg}
                                </div>
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                            {message && (
                                <p className="mt-1 text-sm text-gray-500 whitespace-normal break-words">
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>

                    {children}

                    <div className="flex justify-end gap-2 mt-5">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg
                            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                            transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`px-4 py-2 border border-transparent text-white text-sm font-medium rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200
                            ${getButtonColorClasses(confirmButtonColor)}`}
                        >
                            {confirmButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}