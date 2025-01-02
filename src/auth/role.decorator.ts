import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RoleGuard } from '../auth/role.guard'

export const ROLE_KEY = 'roles'

export function hasRole(...roles: string[]) {
	return applyDecorators(
		UseGuards(JwtAuthGuard),
		SetMetadata(ROLE_KEY, roles),
		UseGuards(RoleGuard)
	)
}
