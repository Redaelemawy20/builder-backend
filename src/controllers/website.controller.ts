import { WebsiteStatus } from '@prisma/client';
import prisma from '../lib/prisma';
import { Request, Response, NextFunction } from 'express';
import { Tr } from '../types';
import createFormidableParser, { getFirst } from '../lib/formidable-config';
import { Fields, Files } from 'formidable';
import path from 'path';
import convertToSlug from '../utils/convertToSlug';
import { saveFile } from '../utils/savFile';
// Get all websites
export const getWebsites = async (req: any, res: any) => {
  try {
    const websites = await prisma.website.findMany({
      include: {
        pages: true,
        news: true,
        layoutItem: true,
      },
    });
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

interface CreateWebsiteBody {
  name: string;
  status: WebsiteStatus;
  type: string;
  topTitle: Tr<string>;
  description: Tr<string>;
  logo: {
    name: string;
    image: string;
  };
}

// creat website
export const createWebsite = async (req: Request, res: Response) => {
  const form = createFormidableParser({ multiples: false });
  form.parse(
    req,
    async (err: any, fields: Fields<'data'>, files: Files<'logoImage'>) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(400).send('Invalid form data');
      }
      let body = fields;
      let bodyData = JSON.parse(
        getFirst(body.data) || '{}'
      ) as CreateWebsiteBody;
      let logoImage = getFirst(files.logoImage);
      try {
        // store to database
        // if not user throw error
        if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log(bodyData);
        const website = await prisma.website.create({
          data: {
            slug: convertToSlug(bodyData.name),
            name: bodyData.name,
            status: bodyData.status,
            type: bodyData.type,
            meta: {
              topTitle: bodyData.topTitle,
              description: bodyData.description,
              logoImage: logoImage
                ? path.join('uploads', logoImage.newFilename)
                : null,
            },
            userId: req.user.id,
          },
        });
        try {
          // store file to storage
          if (logoImage) {
            await saveFile(logoImage);
          }
          return res.json({ message: 'Website created successfully', website });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server error' });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
      }
    }
  );
};
