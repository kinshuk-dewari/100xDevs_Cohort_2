"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstname, lastname) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.create({
                data: {
                    email: username,
                    password,
                    firstname,
                    lastname
                }
            });
            console.log("DATA INSERTION SUCCESS: ", res);
        }
        catch (e) {
            console.error("Failed to insert user:", e);
            throw e;
        }
        finally {
            yield prisma.$disconnect();
            console.log("DATABASES SUCCESSFULLY DISCONNECTED");
        }
    });
}
function displayUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findMany();
            console.log("All Users: ", users);
        }
        catch (e) {
            console.error("ERROR: ", e);
        }
        finally {
            console.log("DATABASE SUCCESSFULLY DISCONNECTED");
        }
    });
}
displayUsers();
function updateUser(email_1, _a) {
    return __awaiter(this, arguments, void 0, function* (email, { firstname, lastname }) {
        try {
            const res = yield prisma.user.update({
                where: { email },
                data: {
                    firstname,
                    lastname
                }
            });
            console.log("UPDATED DATA: ", res);
        }
        catch (e) {
            console.error("ERROR: ", e);
        }
        finally {
            yield prisma.$disconnect();
            console.log("DATABASES SUCCESSFULLY DISCONNECTED");
        }
    });
}
