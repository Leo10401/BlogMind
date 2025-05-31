"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import HTMLReactParser from "html-react-parser"
import { GoogleGenerativeAI } from "@google/generative-ai"
import ReactMarkdown from "react-markdown"
import DOMPurify from "dompurify"
import useAppContext from "@/context/AppContext"
import { Eye, ChevronRight, Mail, Tag, MessageCircle, Send, ArrowRight, BookOpen, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Blog() {
  const { id } = useParams()
  const { email } = useAppContext()

  const [blogData, setBlogData] = useState(null)
  const [catBlogs, setCatBlogs] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState("")
  const [summary2, setSummary2] = useState("")
  const [showSummary, setShowSummary] = useState(false)
  const [showSummary2, setShowSummary2] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])
  const [userData, setUserData] = useState(null)
  const [authorDialogOpen, setAuthorDialogOpen] = useState(false)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [summary2Loading, setSummary2Loading] = useState(false)

  useEffect(() => {
    // Fetch current user's data
    if (email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/getbyemail/${email}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("Error fetching user data:", err))
    }
  }, [email])

  const fetchBlogsByCategory = useCallback(async (category) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/getbycategory/${category}`)
      setCatBlogs(res.data)
    } catch (err) {
      setError("Failed to fetch related blogs.")
    }
  }, [])

  const fetchBlogData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/getbyid/${id}`, {
        headers: { "x-auth-token": token },
      })
      setBlogData(res.data)
      setComments(res.data.comments)
      fetchBlogsByCategory(res.data.category)
    } catch (err) {
      setError("Failed to fetch blog data.")
    } finally {
      setLoading(false)
    }
  }, [id, fetchBlogsByCategory])

  const fetchSummary = useCallback(async () => {
    if (!blogData?.content) return

    try {
      setSummaryLoading(true)
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBfnLaGKASmYcczhMHkLo8hIeh-nrCbclM",
      )
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const result = await model.generateContent(
        "summarize this blog and tell whether the blog is ai genterated in percentage and tell the word meaning of difficult words: " +
          blogData.content,
      )
      setSummary(result.response.text())
    } catch (error) {
      console.error("Error generating summary:", error)
    } finally {
      setSummaryLoading(false)
    }
  }, [blogData])

  const summarizeContent = async () => {
    try {
      setSummary2Loading(true)
      const cleanContent = DOMPurify.sanitize(blogData.content)
      const strippedContent = cleanContent.replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blog/summarize`, {
        content: strippedContent,
      })
      setSummary2(response.data.summary)
      setShowSummary2(true)
    } catch (error) {
      console.error("Error summarizing:", error)
    } finally {
      setSummary2Loading(false)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    // Prevent submitting empty comments
    if (!commentText.trim()) return

    if (!userData) {
      console.error("No user data available.")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/comment/${blogData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          text: commentText,
          user: userData.name,
          avatar: userData.avatar,
        }),
      })

      if (response.ok) {
        // Update comments list with the newly added comment
        const updatedBlog = await response.json()
        setComments(updatedBlog.comments)
        setCommentText("")
      } else {
        console.error("Failed to add comment")
      }
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  useEffect(() => {
    fetchBlogData()
  }, [fetchBlogData])

  useEffect(() => {
    if (blogData) fetchSummary()
  }, [blogData, fetchSummary])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {blogData && (
          <>
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/listblog">Latest</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Blog</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Blog Title */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {blogData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                {/* Author info */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAuthorDialogOpen(true)}>
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage
                      src={blogData.author?.avatar || "/placeholder-avatar.png"}
                      alt={blogData.author?.name || "Author"}
                    />
                    <AvatarFallback>{blogData.author?.name?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{blogData.author?.name || "Unknown Author"}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(blogData.date).toLocaleDateString()}</span>
                </div>

                {/* View count */}
                <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                  <Eye className="h-4 w-4" />
                  <span>{blogData.viewCount} views</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Blog Content */}
              <div className="lg:col-span-8">
                <div className="prose prose-lg max-w-none bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                  <div className="blog-content">{HTMLReactParser(blogData.content || "No content available")}</div>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag className="h-4 w-4 text-gray-500" />
                      {blogData.tags?.length ? (
                        blogData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No tags available</span>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mt-4">
                    <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600">
                      {blogData.category}
                    </Badge>
                  </div>
                </div>

                {/* Node Summarizer */}
                <div className="mt-8">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Node Summarizer
                      </CardTitle>
                      <CardDescription>Get an AI-powered summary of this article</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!showSummary2 ? (
                        <Button onClick={summarizeContent} className="w-full sm:w-auto" disabled={summary2Loading}>
                          {summary2Loading ? (
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                              Generating summary...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>Generate Summary</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          {HTMLReactParser(summary2)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Comments Section */}
                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Comments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Comment Form */}
                      <form onSubmit={handleCommentSubmit} className="space-y-3">
                        <Textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add your thoughts..."
                          className="min-h-24"
                          required
                        />
                        <Button type="submit" className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Post Comment
                        </Button>
                      </form>

                      {/* Comments List */}
                      <div className="space-y-4 mt-6">
                        {comments.length > 0 ? (
                          comments.map((comment, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <div className="flex items-center gap-3 mb-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={comment.avatar || "/placeholder-avatar.png"} alt={comment.user} />
                                  <AvatarFallback>{comment.user?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{comment.user}</p>
                                  <p className="text-xs text-gray-500">
                                    {comment.date ? new Date(comment.date).toLocaleDateString() : "Recently"}
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-700">{comment.text}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <MessageCircle className="h-12 w-12 mx-auto opacity-20 mb-2" />
                            <p>No comments yet. Be the first to share your thoughts!</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                {/* AI Summary */}
                <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-violet-50 to-indigo-50">
                  <CardHeader className="pb-3 border-b border-gray-100">
                    <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
                    <CardDescription>Powered by Google Gemini</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {summaryLoading ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-3"></div>
                        <p className="text-sm text-gray-500">Analyzing content...</p>
                      </div>
                    ) : summary ? (
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowSummary(!showSummary)}
                          className="w-full justify-between"
                        >
                          <span>{showSummary ? "Hide Summary" : "Show Summary"}</span>
                          <ChevronRight className={`h-4 w-4 transition-transform ${showSummary ? "rotate-90" : ""}`} />
                        </Button>

                        {showSummary && (
                          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-indigo-100 prose prose-sm max-w-none">
                            <ReactMarkdown>{summary}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 py-4">Unable to generate summary.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Related Blogs */}
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>Related Articles</span>
                    <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
                  </h2>

                  <div className="space-y-4">
                    {catBlogs.length > 0 ? (
                      catBlogs.map((blog) => (
                        <Link href={`/blog/${blog._id}`} key={blog._id}>
                          <Card className="overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex flex-row h-full">
                              <div className="relative w-1/3">
                                <div className="absolute inset-0">
                                  <Image
                                    src={blog.image || "/placeholder.svg?height=120&width=120"}
                                    alt={blog.title || "Blog image"}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div className="w-2/3 p-4">
                                <h3 className="font-semibold text-gray-900 line-clamp-2">{blog.title || "Untitled"}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                  {blog.description || "No description available."}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No related articles found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Author Dialog */}
      <Dialog open={authorDialogOpen} onOpenChange={setAuthorDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Author Profile</DialogTitle>
            <DialogDescription>Learn more about the author of this article</DialogDescription>
          </DialogHeader>

          <div className="flex items-start gap-4 py-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage
                src={blogData?.author?.avatar || "/placeholder-avatar.png"}
                alt={blogData?.author?.name || "Author"}
              />
              <AvatarFallback>{blogData?.author?.name?.charAt(0) || "A"}</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{blogData?.author?.name || "Unknown Author"}</h3>
              <p className="text-sm text-gray-500">{blogData?.author?.role || "Writer"}</p>

              <p className="text-sm text-gray-700 mt-4">{blogData?.author?.description || "No bio available."}</p>

              {blogData?.author?.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${blogData.author.email}`} className="text-primary hover:underline">
                    {blogData.author.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAuthorDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
