import { useState, useEffect } from 'react'
import { getCurrentUser, getUserProfile, subscribeToRequests } from '../appwrite'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'emergency' | 'info' | 'success'
}

function Notifications() {

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unread, setUnread]               = useState(0)
  const [isOpen, setIsOpen]               = useState(false)

  useEffect(() => {

    // Starter notifications
    const starterNotifications: Notification[] = [
      {
        id: '1',
        title: '👋 Welcome to BloodLink!',
        message: 'You will receive live alerts here when someone nearby needs your blood type.',
        time: 'Just now',
        read: false,
        type: 'info',
      },
      {
        id: '2',
        title: '✅ You are All Set!',
        message: 'Make sure your availability is switched ON so donors can find you!',
        time: '1 minute ago',
        read: false,
        type: 'success',
      },
    ]

    setNotifications(starterNotifications)
    setUnread(starterNotifications.filter((n) => !n.read).length)

    // Subscribe to real time blood requests
    const unsubscribe = subscribeToRequests(async (request) => {

      // Get current user to check blood type match
      const currentUser = await getCurrentUser()
      if (!currentUser) return

      const userProfile = await getUserProfile(currentUser.$id)

      // Build the notification
      const newNotif: Notification = {
        id: request.$id,
        title: '🚨 Emergency Blood Request!',
        message: userProfile?.bloodType === request.bloodType
          ? `🩸 URGENT! Someone near ${request.location} needs ${request.bloodType} blood — YOUR blood type! Please respond!`
          : `Someone near ${request.location} urgently needs ${request.bloodType} blood.`,
        time: 'Just now',
        read: false,
        type: 'emergency',
      }

      // Add new notification to the top of the list
      setNotifications((prev) => [newNotif, ...prev])
      setUnread((prev) => prev + 1)

      // Play a sound alert for emergencies
      const audio = new Audio('https://www.soundjay.com/buttons/sounds/beep-07.mp3')
      audio.play().catch(() => {})

    })

    // Clean up subscription when component unmounts
    return () => {
      unsubscribe()
    }

  }, [])

  function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    setUnread(0)
  }

  function markRead(id: string) {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ))
    setUnread((prev) => Math.max(0, prev - 1))
  }

  function deleteNotification(id: string) {
    const updated = notifications.filter((n) => n.id !== id)
    setNotifications(updated)
    setUnread(updated.filter((n) => !n.read).length)
  }

  return (
    <div className="notif-wrapper">

      {/* Bell button */}
      <button
        className="notif-bell"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unread > 0 && (
          <span className="notif-badge">{unread}</span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="notif-panel">

          <div className="notif-header">
            <h3 className="notif-title">Notifications</h3>
            {unread > 0 && (
              <button className="notif-mark-all" onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className="notif-list">
            {notifications.length === 0 ? (
              <div className="notif-empty">
                <span>🔕</span>
                <p>No notifications yet!</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notif-item ${!notif.read ? 'notif-item-unread' : ''} notif-${notif.type}`}
                  onClick={() => markRead(notif.id)}
                >
                  <div className="notif-item-content">
                    <p className="notif-item-title">{notif.title}</p>
                    <p className="notif-item-message">{notif.message}</p>
                    <p className="notif-item-time">{notif.time}</p>
                  </div>
                  <button
                    className="notif-delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notif.id)
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {isOpen && (
        <div
          className="notif-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

    </div>
  )
}

export default Notifications