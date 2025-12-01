import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  return (
    <section className="py-16 md:py-24" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>
          <p className="text-center text-muted-foreground mb-12">
            Have questions or want to get involved? Reach out to us!
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Your Message" rows={5} />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
          <div className="mt-12 text-center space-y-2 text-muted-foreground">
            <p>Email: educateallyouthorganization@gmail.com</p>
            <p>Location: Kenya</p>
          </div>
        </div>
      </div>
    </section>
  )
}
