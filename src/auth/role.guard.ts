import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLE_KEY } from './role.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<string[]>(
			ROLE_KEY,
			context.getHandler()
		)
		if (requiredRoles.length === 0) {
			return true
		}
		const { user } = context.switchToHttp().getRequest()
		return user.roles?.some((role: any) => requiredRoles.includes(role.name))
	}
}
