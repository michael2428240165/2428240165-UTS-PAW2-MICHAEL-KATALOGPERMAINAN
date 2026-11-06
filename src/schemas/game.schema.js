import { z } from "zod";

export const storeGameSchema = z.object({
    title : z.string().trim().min(1, "Title wajib diisi"),
    genre : z.string().trim().min(3, "Genre minimal 3 karakter"),
    platform : z.string().trim().min(2, "Platform minimal 2 karakter"),
    price : z.number("Price harus angka")
})

export const updateGameSchema = z.object({
    title : z.string().trim().min(1, "Title wajib diisi"),
    genre : z.string().trim().min(3, "Genre minimal 3 karakter"),
    platform : z.string().trim().min(2, "Platform minimal 2 karakter"),
    price : z.number("Price harus angka")
})