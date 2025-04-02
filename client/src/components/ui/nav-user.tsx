import { useAuth } from "@/auth/AuthContext";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import { useUserStore } from "@/store/user-store";
import { useAreaChartStore } from "@/store/area-chart-store";
import { useBarChartStore } from "@/store/bar-chart-store";
import { useLineChartStore } from "@/store/line-chart-store";
import { usePieChartStore } from "@/store/pie-chart-store";
import { authClient } from "@/util/auth-client";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { LogOutIcon, MoreVerticalIcon } from "lucide-react";

const NavUser = ({ user }: {
    user: {
        id: string;
        name: string;
        email: string;
    }
}) => {

    const { setIsAuthenticated } = useAuth()
    const { clearUser } = useUserStore()
    const { clearAreaChartData } = useAreaChartStore()
    const { clearBarChartData } = useBarChartStore()
    const { clearLineChartData } = useLineChartStore()
    const { clearPieChartData } = usePieChartStore()  

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
        <SidebarMenu>
          <SidebarMenuItem className='bg-white'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent w-[13.5rem]'>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'> { user.name } </span>
                    <span className='truncate text-xs text-muted-foreground'> { user.email } </span>
                  </div>
                  <MoreVerticalIcon className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg' 
              side='right'
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
    )
}

export default NavUser