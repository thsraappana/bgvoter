"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

function Nav() {
  const { data: session } = useSession();

  const [ providers, setProviders ] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState(true)

  const open = Boolean(anchorEl)

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
      setLoading(false);
    })();
  }, []);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 pr-5 pl-5">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo_transparent.png"
            alt="BGVoter Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>

      <div className="flex justify-center flex-col">
        <div>
        {loading && <div>
          <Image
            src='assets/icons/loader.svg'
            width={37}
            height={37}
            alt='loader'
            className='object-contain'
          />
          </div>}
        {!loading && session?.user && (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 37, height: 37 }}>
                  <Image
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={ () => { handleClose(); signOut(); }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
        </Menu>
      </>)}
        {!loading && !session?.user &&
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <Button key={provider.name} variant="outlined" color="secondary" onClick={() => signIn(provider.id)}>Log In</Button>
            ))}
        </>}
        </div>
      </div>
    </nav>
  )
}

export default Nav