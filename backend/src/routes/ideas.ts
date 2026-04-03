import express, { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { optionalAuthMiddleware } from '../middleware/auth'

const router = express.Router()

// GET /api/ideas - Get side hustle ideas (public endpoint)
router.get('/', optionalAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { skills, difficulty, category } = req.query

    const whereClause: any = {}

    if (skills) {
      const skillArray = Array.isArray(skills) ? skills : [skills]
      whereClause.skills = {
        hasSome: skillArray
      }
    }

    if (difficulty) {
      whereClause.difficulty = difficulty
    }

    const ideas = await prisma.idea.findMany({
      where: whereClause,
      orderBy: [{ difficulty: 'asc' }, { estimatedIncomeMin: 'desc' }]
    })

    // Format response to match frontend expectations
    const formattedIdeas = ideas.map(idea => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      skills: idea.skills,
      difficulty: idea.difficulty,
      estimatedIncome: {
        min: idea.estimatedIncomeMin,
        max: idea.estimatedIncomeMax,
        unit: idea.incomeUnit
      },
      timeToStart: idea.timeToStart,
      requiredTools: idea.requiredTools,
      resources: idea.resources
    }))

    res.json(formattedIdeas)
  } catch (error) {
    console.error('Get ideas error:', error)
    res.status(500).json({ error: 'Failed to fetch ideas' })
  }
})

// GET /api/ideas/:id - Get idea by ID with steps
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const idea = await prisma.idea.findUnique({
      where: { id }
    })

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' })
    }

    // Format response
    const formattedIdea = {
      id: idea.id,
      title: idea.title,
      description: idea.description,
      skills: idea.skills,
      difficulty: idea.difficulty,
      estimatedIncome: {
        min: idea.estimatedIncomeMin,
        max: idea.estimatedIncomeMax,
        unit: idea.incomeUnit
      },
      timeToStart: idea.timeToStart,
      requiredTools: idea.requiredTools,
      resources: idea.resources,
      steps: idea.steps
    }

    res.json(formattedIdea)
  } catch (error) {
    console.error('Get idea error:', error)
    res.status(500).json({ error: 'Failed to fetch idea' })
  }
})

export default router