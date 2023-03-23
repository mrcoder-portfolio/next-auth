export default function Layout({ children }) {
    return (
        <>
            <div className="flex min-h-screen bg-blue-400">
                <div className="left m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid grid-cols-1 lg:grid-cols-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 relative overflow-hidden">
                        <div className="img-login inset-0 w-full h-full"></div>
                        <div className="cloud-1"></div>
                        <div className="cloud-2"></div>
                    </div>
                    <div className="right flex flex-col justify-evenly bg-white">
                        <div className="text-center py-4">
                            {children}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}