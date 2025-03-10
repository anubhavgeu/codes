import express from 'express';
import cors from 'cors';
import { addBookmark, deleteBookmark, getAllBookmarks, searchBookmark } from './routes/bookmarks.js'; // importing callback functions for routes
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Get all bookmarks
app.get('/bookmarks', getAllBookmarks);

// Add a new bookmark
app.post('/bookmarks', addBookmark);


// Delete a bookmark
app.delete('/bookmarks/:id', deleteBookmark);

//  TODO: Can u implement searching bookmark and favorite and unfavorite bookmark route ??

app.get('/bookmarks/search', searchBookmark);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
