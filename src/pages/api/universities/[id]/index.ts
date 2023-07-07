import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { universityValidationSchema } from 'validationSchema/universities';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.university
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getUniversityById();
    case 'PUT':
      return updateUniversityById();
    case 'DELETE':
      return deleteUniversityById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUniversityById() {
    const data = await prisma.university.findFirst(convertQueryToPrismaUtil(req.query, 'university'));
    return res.status(200).json(data);
  }

  async function updateUniversityById() {
    await universityValidationSchema.validate(req.body);
    const data = await prisma.university.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteUniversityById() {
    const data = await prisma.university.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
