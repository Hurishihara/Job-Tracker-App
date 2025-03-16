import { Calendar, Home, Inbox, Search, Settings, LayoutDashboard, ChartArea, Briefcase } from "lucide-react"
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
      <SidebarFooter />
    </Sidebar>
  )
}
