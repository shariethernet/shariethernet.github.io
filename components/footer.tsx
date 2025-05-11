import { Download, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer({ resumeUrl }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <Button asChild size="lg" className="mb-8">
            <a href={resumeUrl} download className="flex items-center">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </Button>

          <div className="text-center">
            <p className="text-muted-foreground mb-2">© {currentYear} Shrihari Gokulachandran. All rights reserved.</p>
            <p className="flex items-center justify-center text-sm">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
