import { Client, Databases, Account, Storage, ID } from 'appwrite'

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6a18b748000a9af16349')

export const databases = new Databases(client)
const account   = new Account(client)
const storage   = new Storage(client)

const DATABASE_ID    = '6a18b7cb002c5942fb51'
const DONORS_TABLE   = 'donors'
const REQUESTS_TABLE = 'requests'
const REVIEWS_TABLE  = 'reviews'
const USERS_TABLE    = 'users'
const BUCKET_ID      = '6a1b6cb200033f0261fc'

// Auth functions
export async function signUp(name: string, email: string, password: string) {
  const user = await account.create(ID.unique(), email, password, name)
  await signIn(email, password)
  return user
}

export async function signIn(email: string, password: string) {
  return await account.createEmailPasswordSession(email, password)
}

export async function signOut() {
  return await account.deleteSession('current')
}

export async function getCurrentUser() {
  try {
    return await account.get()
  } catch {
    return null
  }
}

// User profile functions
export async function saveUserProfile(data: {
  userId: string
  name: string
  email: string
  gender: string
  profilePic: string
}) {
  return await databases.createDocument(
    DATABASE_ID,
    USERS_TABLE,
    ID.unique(),
    data
  )
}

export async function getUserProfile(userId: string) {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      USERS_TABLE,
    )
    return result.documents.find((doc) => doc.userId === userId) || null
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

// Storage functions
export async function uploadProfilePicture(file: File) {
  const response = await storage.createFile(
    BUCKET_ID,
    ID.unique(),
    file
  )
  return response.$id
}

export function getProfilePictureUrl(fileId: string) {
  const url = storage.getFileView(
    BUCKET_ID,
    fileId
  )
  return url.toString()
}

// Donor functions
export async function registerDonor(data: {
  name: string
  email: string
  phone: string
  bloodType: string
  location: string
  available: boolean
  registerType: string
}) {
  return await databases.createDocument(
    DATABASE_ID,
    DONORS_TABLE,
    ID.unique(),
    data
  )
}

export async function getDonors() {
  return await databases.listDocuments(
    DATABASE_ID,
    DONORS_TABLE
  )
}

// Request functions
export async function createRequest(data: {
  patientName: string
  bloodType: string
  hospital: string
  location: string
  phone: string
  urgency: string
  status: string
}) {
  return await databases.createDocument(
    DATABASE_ID,
    REQUESTS_TABLE,
    ID.unique(),
    data
  )
}

// Review functions
export async function createReview(data: {
  name: string
  rating: number
  comment: string
  type: string
  date: string
}) {
  return await databases.createDocument(
    DATABASE_ID,
    REVIEWS_TABLE,
    ID.unique(),
    data
  )
}

export async function getReviews() {
  return await databases.listDocuments(
    DATABASE_ID,
    REVIEWS_TABLE
  )
}

export function subscribeToRequests(callback: (request: any) => void) {
  return client.subscribe(
    `databases.${DATABASE_ID}.collections.${REQUESTS_TABLE}.documents`,
    (response: any) => {
      if (response.events.includes(
        'databases.*.collections.*.documents.*.create'
      )) {
        callback(response.payload)
      }
    }
  )
}