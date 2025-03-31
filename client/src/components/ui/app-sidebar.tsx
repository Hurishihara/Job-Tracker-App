import { LayoutDashboard, ChartArea, Briefcase, MoreVerticalIcon, LogOutIcon } from 'lucide-react'
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
  useSidebar,
} from '@/components/ui/sidebar'
import whitelogo from '@/assets/sidebarlogo.png'
import { authClient } from '@/util/auth-client'
import { useAuth } from '@/auth/AuthContext'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { useUserStore } from '@/store/user-store'
import { useAreaChartStore } from '@/store/area-chart-store'
import { useBarChartStore } from '@/store/bar-chart-store'
import { useLineChartStore } from '@/store/line-chart-store'
import { usePieChartStore } from '@/store/pie-chart-store'


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

  const { setIsAuthenticated } = useAuth()
  const { user, clearUser } = useUserStore()
  const { clearAreaChartData } = useAreaChartStore()
  const { clearBarChartData } = useBarChartStore()
  const { clearLineChartData } = useLineChartStore()
  const { clearPieChartData } = usePieChartStore()  

  const { isMobile } = useSidebar()

  const handleClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully', {
            className: 'font-tertiary text-lg font-bold',
            duration: 1000,
          })
          clearUser()
          clearAreaChartData()
          clearBarChartData()
          clearLineChartData()
          clearPieChartData()
          setIsAuthenticated(false)
        }
      }
    })
  }

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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'> { user.name } </span>
                    <span className='truncate text-xs text-muted-foreground'> { user.email } </span>
                  </div>
                  <MoreVerticalIcon className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg' 
              side={ isMobile ? 'bottom' : 'right' } 
              align='end'
              sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-bold font-primary'> { user.name } </span>
                      <span className='truncate text-xs font-semibold text-muted-foreground font-primary font-medium'> { user.email } </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='font-primary font-semibold text-sm text-muted-foreground' onClick={handleClick}>
                  <LogOutIcon className='text-black' />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}