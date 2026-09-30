const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>&copy; {new Date().getFullYear()} Campus Lost &amp; Found Portal</p>
        <p>Built with React, Node.js, Express &amp; MongoDB</p>
      </div>
    </footer>
  );
};

export default Footer;
