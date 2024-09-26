import Link from "next/link";

export default async function NotFoundPage() {
    return (
        <section className="bg-white dark:bg-gray-900 h-full shadow-md border rounded-lg">
            <div className="px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 h-full flex flex-col items-center">
                <div className="max-w-screen-sm text-center h-full flex flex-col items-center justify-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary-500">404</h1>
                    <p className="mb-7 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Somethings missing.</p>
                    <p className="mb-4 text-lg font-medium text-gray-600 dark:text-gray-400">Sorry, we cant find that page. Youll find lots to explore on the home page. </p>
                    <Link href="/" className="inline-flex text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
                    Back to Homepage</Link>
                </div>
            </div>
        </section>
    );
}