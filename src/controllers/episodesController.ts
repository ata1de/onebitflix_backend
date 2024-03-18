// src/controllers/episodesController.ts

import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export const episodesController = {
  // GET /episodes/stream
  stream: async (req: Request, res: Response) => {
		const { videoUrl } = req.query

        try {
            if (typeof videoUrl !== 'string') throw new Error('videoUrl param must be of type string')

            const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
            const fileStat = fs.statSync(filePath) 

            const range = req.headers.range

            // if (range) {
            //     const parts  =
            // }

        } catch (error) {
            
        }

  }
}