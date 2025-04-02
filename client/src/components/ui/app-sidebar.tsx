import { LayoutDashboard, ChartArea, Briefcase } from 'lucide-react'
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
} from '@/components/ui/sidebar'
import whitelogo from '@/assets/sidebarlogo.png'
import { useUserStore } from '@/store/user-store'
import NavUser from './nav-user'


// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Applications',
    url: '/applications',
    icon: Briefcase,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: ChartArea,
  },
]

export function AppSidebar() {

  const { user } = useUserStore()
  
  return (
    <Sidebar collapsible='offcanvas' variant='floating'>
      <SidebarContent className='bg-white rounded-2xl'>
        <SidebarGroup className='bg-white'>
          <SidebarGroupLabel className='mt-[1.5rem] mb-[3rem] p-3 text-2xl text-black font-bold'>
            <div className='flex flex-row gap-[0.5rem] items-center'>
              <img src={whitelogo} alt='logo' className='h-9 w-9 rounded-lg' />
                <div className='font-primary font-bold text-2xl'>
                    traqify
                </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-5'>
              {items.map((item) => (
                <SidebarMenuItem className='font-primary text-muted-foreground font-semibold' key={item.title}>
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
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}