import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Volunteer {
  id: string
  name: string
  role?: string
  bio?: string
  image_url?: string
  created_at: string
}

interface VolunteersSectionProps {
  volunteers: Volunteer[]
}

export default function VolunteersSection({ volunteers }: VolunteersSectionProps) {
  if (!volunteers || volunteers.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="volunteers">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Volunteers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteers.slice(0, 8).map((volunteer) => (
            <Card key={volunteer.id}>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={volunteer.image_url || "/placeholder.svg"} alt={volunteer.name} />
                  <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{volunteer.name}</CardTitle>
                {volunteer.role && <p className="text-sm text-muted-foreground">{volunteer.role}</p>}
              </CardHeader>
              {volunteer.bio && (
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{volunteer.bio}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
