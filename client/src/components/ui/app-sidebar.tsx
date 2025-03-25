import { LayoutDashboard, ChartArea, Briefcase, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "./avatar"
import image1 from '../../assets/logo1.png'
import { authClient } from "@/util/auth-client"
import { useNavigate } from "react-router-dom"


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    url: '/applications',
    icon: Briefcase,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartArea,
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
    <Sidebar collapsible='offcanvas' variant='inset'  >
      <SidebarContent className='bg-white'>
        <SidebarGroup>
          <SidebarGroupLabel className='mt-[1.5rem] mb-[3rem] p-3 text-2xl text-black font-bold'>
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
            <SidebarMenu className='gap-5'>
              {items.map((item) => (
                <SidebarMenuItem className='font-primary text-gray-500 font-semibold' key={item.title}>
                  <SidebarMenuButton className='p-5' asChild>
                    <a href={item.url}>
                      <item.icon style={{ width: 20, height: 20 }} strokeWidth={2} className='text-black' />
                      <span className='text-[1.2rem]'>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='hover:bg-gray-100 px-[1.5rem] my-[1.5rem] mx-2 bg-white cursor-pointer rounded-md' onClick={handleClick}>
        <div className='flex flex-row items-center text-[1.2rem] gap-2 font-primary text-gray-500 font-semibold hover:text-black'>
          <LogOut style={{ width: 20, height: 20 }} strokeWidth={2} className='text-black' />
          <div>
            Sign out
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}