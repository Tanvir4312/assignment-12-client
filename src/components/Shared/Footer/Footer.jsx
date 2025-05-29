const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
         <a className="btn btn-ghost text-xl flex">
            <img
              className="w-12"
              src="https://img.icons8.com/?size=160&id=6v11UYN0Fynq&format=png"
              alt=""
            />
            <p className="text-3xl font-semibold">
              <span className="text-white">Tech</span>
              <span className="text-blue-600">Trove</span>
            </p>
          </a>
          <p className="text-sm text-gray-400 pt-5">
            Discover and share your favorite products. Powered by the community.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/terms" className="hover:text-white">
                Terms
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email address"
              className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 py-2 rounded text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Product Hunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
