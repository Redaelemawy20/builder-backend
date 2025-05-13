import prisma from '../lib/prisma';

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
