import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (<>
        <div className="p-8 py-20 flex justify-center mt-12">
            <div className="p-10 text-center flex flex-col items-center space-y-4 shadow rounded-2xl border border-primary-light bg-white">
                <h1 className="text-xl font-bold text-primary ">404 Page Not Found</h1>
                <p>Sorry, the page you're looking for does not available.</p>
                <Link to="/" className="text-white bg-primary rounded-lg px-6 py-2 text-sm hover:shadow-lg">
                    Go to Home
                </Link>
            </div>
        </div>
    </>
    );
};

export default NotFoundPage;