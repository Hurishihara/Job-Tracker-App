import { Calendar, Home, Inbox, Search, Settings, LayoutDashboard, ChartArea, Briefcase, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "./avatar"
import image1 from '../../assets/logo1.png'
import { authClient } from "@/util/auth-client"
import { useNavigate } from "react-router-dom"
import { Button } from "./button"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    url: "#",
    icon: Briefcase,
  },
  {
    title: "Calendar & Reminders",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Analytics & Insights",
    url: "#",
    icon: ChartArea,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {

  const navigate = useNavigate();

  const handleClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate('/login')
        }
      }
    })
  }

  return (
    <Sidebar>
      <SidebarContent className='bg-white'>
        <SidebarGroup>
          <SidebarGroupLabel className='mt-[1.5rem] mb-[3rem] p-[1.5rem] text-[1.5rem] text-black font-bold'>
            <div className='flex flex-row gap-[0.5rem] items-center'>
                <Avatar>
                    <AvatarImage src={image1} className='' />
                </Avatar>
                <div className='font-primary'>
                    Sync
                </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-[1.5rem]'>
              {items.map((item) => (
                <SidebarMenuItem className='font-primary text-gray-500' key={item.title}>
                  <SidebarMenuButton className='p-[1.5rem]' asChild>
                    <a href={item.url}>
                      <item.icon style={{ width: 20, height: 20 }} strokeWidth={2} />
                      <span className='text-[1.2rem]'>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='hover:bg-gray-100 px-[1.5rem] my-[1.5rem] bg-white cursor-pointer ' onClick={handleClick}>
        <div className='flex flex-row items-center text-[1.2rem] gap-2 font-primary text-gray-500 hover:text-black'>
          <LogOut style={{ width: 20, height: 20 }} strokeWidth={2} />
          <div>
            Sign out
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
