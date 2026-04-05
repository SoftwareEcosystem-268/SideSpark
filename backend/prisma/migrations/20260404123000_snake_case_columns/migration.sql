-- Rename camelCase columns to snake_case without data loss.
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE "skills" RENAME COLUMN "nameEn" TO "name_en";

ALTER TABLE "user_skills" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "user_skills" RENAME COLUMN "skillId" TO "skill_id";
ALTER TABLE "user_skills" RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "ideas" RENAME COLUMN "estimatedIncomeMin" TO "estimated_income_min";
ALTER TABLE "ideas" RENAME COLUMN "estimatedIncomeMax" TO "estimated_income_max";
ALTER TABLE "ideas" RENAME COLUMN "incomeUnit" TO "income_unit";
ALTER TABLE "ideas" RENAME COLUMN "timeToStart" TO "time_to_start";
ALTER TABLE "ideas" RENAME COLUMN "requiredTools" TO "required_tools";

ALTER TABLE "projects" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "projects" RENAME COLUMN "initialCost" TO "initial_cost";
ALTER TABLE "projects" RENAME COLUMN "monthlyGoal" TO "monthly_goal";
ALTER TABLE "projects" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "projects" RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE "tasks" RENAME COLUMN "projectId" TO "project_id";
ALTER TABLE "tasks" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "tasks" RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE "transactions" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "transactions" RENAME COLUMN "projectId" TO "project_id";
ALTER TABLE "transactions" RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "milestones" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "milestones" RENAME COLUMN "achievedAt" TO "achieved_at";
ALTER TABLE "milestones" RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "refresh_tokens" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "refresh_tokens" RENAME COLUMN "expiresAt" TO "expires_at";
ALTER TABLE "refresh_tokens" RENAME COLUMN "createdAt" TO "created_at";

ALTER INDEX "user_skills_userId_skillId_key" RENAME TO "user_skills_user_id_skill_id_key";

ALTER TABLE "user_skills" RENAME CONSTRAINT "user_skills_userId_fkey" TO "user_skills_user_id_fkey";
ALTER TABLE "user_skills" RENAME CONSTRAINT "user_skills_skillId_fkey" TO "user_skills_skill_id_fkey";
ALTER TABLE "projects" RENAME CONSTRAINT "projects_userId_fkey" TO "projects_user_id_fkey";
ALTER TABLE "tasks" RENAME CONSTRAINT "tasks_projectId_fkey" TO "tasks_project_id_fkey";
ALTER TABLE "transactions" RENAME CONSTRAINT "transactions_userId_fkey" TO "transactions_user_id_fkey";
ALTER TABLE "transactions" RENAME CONSTRAINT "transactions_projectId_fkey" TO "transactions_project_id_fkey";
ALTER TABLE "milestones" RENAME CONSTRAINT "milestones_userId_fkey" TO "milestones_user_id_fkey";
ALTER TABLE "refresh_tokens" RENAME CONSTRAINT "refresh_tokens_userId_fkey" TO "refresh_tokens_user_id_fkey";
