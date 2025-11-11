import React from 'react';
import { List, ListItemButton, ListItemText, Divider, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/catalog', label: 'Course Catalog' },
  { to: '/my-learning', label: 'My Learning' },
  { to: '/assessments', label: 'Assessments' },
  { to: '/profile', label: 'My Profile & Skills' },
  { to: '/resources', label: 'Resources & Support' },
  { to: '/admin', label: 'Admin/Lead Dashboard' }
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return;

    localStorage.clear();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    navigate('/login', { state: { fromLogout: true } });
  };

  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-0 flex flex-col justify-between">
      {/* Navigation */}
      <div>
        <List>
          {items.map(i => (
            <ListItemButton
              key={i.to}
              component={Link}
              to={i.to}
              selected={location.pathname === i.to}
            >
              <ListItemText primary={i.label} />
            </ListItemButton>
          ))}
        </List>
      </div>

      {/* Logout */}
      <div className="p-4">
        <Divider className="mb-4" />
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}