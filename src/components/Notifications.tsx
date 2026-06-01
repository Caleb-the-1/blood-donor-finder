import { useState, useEffect } from 'react'

interface Notification {
  id: number
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
    const fakeNotifications: Notification[] = [
      {
        id: 1,
        title: '🚨 Emergency Blood Request!',
        message: 'Someone near Ado-Ekiti urgently needs O+ blood. Can you help?',
        time: '2 minutes ago',
        read: false,
        type: 'emergency',
      },
      {
        id: 2,
        title: '🩸 New Donor Nearby!',
        message: 'A new A+ donor just registered near Ikere-Ekiti.',
        time: '15 minutes ago',
        read: false,
        type: 'info',
      },
      {
        id: 3,
        title: '✅ Request Fulfilled!',
        message: 'The B- blood request from EKSUTH has been fulfilled. Thank you donors!',
        time: '1 hour ago',
        read: true,
        type: 'success',
      },
      {
        id: 4,
        title: '🚨 Emergency Blood Request!',
        message: 'Someone near Aramoko-Ekiti urgently needs AB+ blood. Can you help?',
        time: '2 hours ago',
        read: true,
        type: 'emergency',
      },
      {
        id: 5,
        title: '💉 Donation Reminder',
        message: 'It has been 3 months since your last donation. You are eligible to donate again!',
        time: '1 day ago',
        read: true,
        type: 'info',
      },
    ]
    setNotifications(fakeNotifications)
    setUnread(fakeNotifications.filter((n) => !n.read).length)
  }, [])

  function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    setUnread(0)
  }

  function markRead(id: number) {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ))
    setUnread(notifications.filter((n) => !n.read && n.id !== id).length)
  }

  function deleteNotification(id: number) {
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

      {/* Close overlay */}
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