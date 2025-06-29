import Link from 'next/link';

export default function CardLayout({ children }) {
  return (
    <main className="min-h-screen w-full bg-gray-900 pt-16 flex justify-center">
      <div className="bg-blue-900 bg-opacity-90 rounded-2xl shadow-2xl p-16 w-full max-w-5xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center font-sans">Web Design in Motion</h1>
        <div className="flex flex-row gap-8 w-full justify-center mb-8">
          <Link href="/users" passHref legacyBehavior>
            <a className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors text-lg">Users</a>
          </Link>
          <Link href="/posts" passHref legacyBehavior>
            <a className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors text-lg">Posts</a>
          </Link>
          <Link href="/charts" passHref legacyBehavior>
            <a className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors text-lg">Charts</a>
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
} 