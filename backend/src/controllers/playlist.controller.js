import { db } from "../libs/db.js";

export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    if (!playlists) {
      return res.status(404).json({ message: "No playlists found" });
    }
    res.status(200).json({
      status: "success",
      message: "Playlists fetched successfully",
      playlists,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue fetching playlists",
      error: error.message,
    });
  }
};

export const getPlaylistDetails = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue fetching playlist",
      error: error.message,
    });
  }
};

export const createPlaylist = async (req, res) => {
  const { name, description } = req.body;
  try {
    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId: req.user.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue creating playlist",
      error: error.message,
    });
  }
};

export const addProblemsToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;
  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ message: "Invalid problem IDs" });
    }
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const problemsInPlaylist = await db.problemsInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });
    res.status(201).json({
      status: "success",
      message: "Problems added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue adding problems to playlist",
      error: error.message,
    });
  }
};
export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Playlist deleted successfully",
      deletedPlaylist,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue deleting playlist",
      error: error.message,
    });
  }
};
export const removeProblemsFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;
  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ message: "Invalid problem IDs" });
    }
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const deletedProblems = await db.problemsInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });
    res.status(200).json({
      status: "success",
      message: "Problems removed from playlist successfully",
      deletedProblems,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "issue removing problems from playlist",
      error: error.message,
    });
  }
};
