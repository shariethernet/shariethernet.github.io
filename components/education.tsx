"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Education({ data }) {
  if (!data) return null

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
        <div className="h-1 w-20 bg-primary mx-auto"></div>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {data.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="overflow-hidden border-l-4 border-l-primary">
              <CardHeader className="bg-muted/30 pb-3">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <div className="flex items-center text-sm text-primary font-medium">
                    <Calendar className="h-4 w-4 mr-1" />
                    {edu.period}
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <h4 className="font-medium">{edu.institution}</h4>
                  {edu.location && (
                    <div className="flex items-center ml-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {edu.location}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {edu.description && <p className="text-muted-foreground mb-3">{edu.description}</p>}

                {edu.courses && edu.courses.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-2">Relevant Coursework:</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, idx) => (
                        <span key={idx} className="bg-muted px-3 py-1 rounded-full text-sm">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mt-3">
                    <h5 className="font-semibold mb-2">Achievements:</h5>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
