export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">EducateAll Youth Organization</h3>
            <p className="text-muted-foreground">
              Empowering youth through education, volunteerism, and community service.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#projects" className="hover:text-foreground transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-foreground transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-foreground transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#volunteers" className="hover:text-foreground transition-colors">
                  Volunteers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: educateallyouthorganization@gmail.com</li>
              <li>Kenya</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} EducateAll Youth Organization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
