import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addProblemsToPlaylist, createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistDetails, removeProblemsFromPlaylist } from "../controllers/playlist.controller.js";

const playlistRoutes = express.Router();
 
playlistRoutes.get("/", authMiddleware, getAllPlaylists);
playlistRoutes.get("/:playlistId", authMiddleware, getPlaylistDetails);
playlistRoutes.post("/create-playlist", authMiddleware, createPlaylist);
playlistRoutes.post("/:playlistId/add-problems", authMiddleware, addProblemsToPlaylist);
playlistRoutes.delete("/:playlistId", authMiddleware, deletePlaylist);
playlistRoutes.delete("/:playlistId/remove-problem", authMiddleware, removeProblemsFromPlaylist);

export default playlistRoutes;