let bookmarks = []; // in memory space
// array of {bookmark, category};
let bookmarkId = 0;
export async function addBookmark(req,res,next){
// write here
    let {bookmark, category} = req.body;
    let lowerCaseBookmark = bookmark.toLowerCase();
    let result = bookmarks.find(bookMark => (bookMark.bookmark).toLowerCase() === lowerCaseBookmark);
    if (result) {
        return res.status(404).json({
            message: "Bookmark already exists"
        })
    };
    bookmarks.push({id: ++bookmarkId,bookmark,category})
    return res.status(202).json({
        message: "Bookmark successfully added",
        bookmarks
    });
}

export async function deleteBookmark(req,res,next){
// write here
    let {id} = req.params;
    id = parseInt(id);
    console.log(typeof id)
    let bookmark = bookmarks.find(bookMark => bookMark.id == id);
    if (!bookmark) {
        return res.status(404).json({
            message: "Bookmark doesn't exist"
        });
    }
    bookmarks = bookmarks.filter(bookMark => bookMark.id !== id);
    return res.status(202).json({
        message: "Bookmark deleted",
        bookmarks
    });
}


export async function getAllBookmarks(req,res,next){
// write here
    return res.status(202).json({
        bookmark: bookmarks
    })
}

export async function searchBookmark(req, res, next) {
    let {bookmarkText} = req.query;
    if (!bookmarkText) {
        return res.status(404).json({
            message: "Enter the text"
        });
    }
    const lowerBookmarkText = bookmarkText.toLowerCase();
    const extractedBookmarks = bookmarks.filter(bookMark => bookMark.bookmark.toLowerCase().includes(lowerBookmarkText));
    return res.status(202).json({
        message: "Searched the bookmarks",
        extractedBookmarks
    })
}