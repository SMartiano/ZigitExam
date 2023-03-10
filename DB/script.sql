USE [master]
GO
/****** Object:  Database [ZigitExam]    Script Date: 1/22/2023 10:42:56 PM ******/
CREATE DATABASE [ZigitExam]
GO
USE [ZigitExam]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 1/22/2023 10:42:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[ID] [nvarchar](250) NULL,
	[UserID] [int] NULL,
	[name] [varchar](255) NULL,
	[durationInDays] [int] NULL,
	[bugsCount] [int] NULL,
	[madeDadeline] [bit] NULL,
	[score] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 1/22/2023 10:42:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[token] [varchar](255) NULL,
	[avatar] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[team] [nvarchar](255) NULL,
	[joinAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([ID])
GO
/****** Object:  StoredProcedure [dbo].[sp_GetProjects]    Script Date: 1/22/2023 10:42:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_GetProjects] @token varchar(50)
as
declare @userID int
set @userID = (select id from users where token = @token)
select     
	ID,
	bugsCount,
	durationInDays,
	madeDadeline,
	name,
	score from projects where userID = @userID

GO
/****** Object:  StoredProcedure [dbo].[sp_Login]    Script Date: 1/22/2023 10:42:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_Login] @email nvarchar(255),@pass nvarchar(255)
as
declare @userID int
set @userID = (select id from users where email like @email and password like @pass)
if (@userID is null)
begin
	set @userID = 0
end
else
begin
	declare @toekn varchar(50)
	set @toekn = (select substring(replace(newid(), '-', ''), 1,15))
	update users set token = @toekn  where id = @userID
end 

select * from users where id = @userID
GO
USE [master]
GO
ALTER DATABASE [ZigitExam] SET  READ_WRITE 
GO
