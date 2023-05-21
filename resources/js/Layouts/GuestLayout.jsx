import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children, title, description }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/" className="place-self-center">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
                    <h1 className="font-serif italic font-bold text-blue-300">Matchers</h1>
                    <h1 className="text-2xl text-center font-bold">{title}</h1>
                    <p className="text-center">{description}</p>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
            <Link href="/" className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pl-1">
                    キャンセル
            </Link>
        </div>
    );
}
