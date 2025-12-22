CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()),
	`created_at` integer DEFAULT (unixepoch())
);
