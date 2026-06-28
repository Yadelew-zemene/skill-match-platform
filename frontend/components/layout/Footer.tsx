export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* BRAND */}
        <div>
          <h2 className="text-lg font-bold text-blue-600">
            SkillMatch
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            AI-powered job matching platform connecting talent with opportunity.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Login</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-600">
            Addis Ababa, Ethiopia
          </p>
          <p className="text-sm text-gray-600">
            support@skillmatch.ai
          </p>
        </div>

      </div>

      <div className="text-center text-xs text-gray-400 py-4 border-t">
        © {new Date().getFullYear()} SkillMatch. All rights reserved.
      </div>
    </footer>
  );
}