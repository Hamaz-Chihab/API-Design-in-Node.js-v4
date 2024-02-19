import { resolve } from "path";
import prisma from "../db";
//get all :
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, products) => {
    return [...allUpdates, ...products.updates];
  }, []); //setup la form de response updates
  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.body.id },
  });
  if (!product) {
    return res.json({ message: "product not exist to be updated" });
  }
  const update = await prisma.update.create({
    data: req.body,
  });
  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []); //setup la form de response updates
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "match == false " });
  }
  const updateUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []); //setup la form de response updates
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "match == false " });
  }
  const deleted = await prisma.update.delete({
    where : {
      id : req.params.id
    }
  })
  res.json({data : deleted })
};
