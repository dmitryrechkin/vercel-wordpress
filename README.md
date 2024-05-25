
# Wordpress with WooCommerce for Vercel with TIDB Cloud Database

The goal of this project is to demonstrate the possibility of deploying WordPress with WooCommerce on the serverless Vercel platform, using the serverless TIDB cloud database. This setup can potentially be hosted for free.

This project allows you to deploy the latest version of a fully-featured WordPress with WooCommerce, as well as selected plugins and themes, to Vercel.

## Benefits

- **Scalability**: Leveraging the serverless architecture of Vercel, the deployment can automatically scale with traffic, ensuring optimal performance.
- **Cost Efficiency**: By utilizing Vercel's and TIDB's free tiers, you can host a full-featured WordPress site at minimal or no cost.
- **Flexibility**: Easily modify the list of plugins and themes to suit your needs, thanks to the customizable `plugins.txt` and `themes.txt`.
- **Modern Infrastructure**: Take advantage of modern cloud infrastructure for better performance, security, and maintenance.

## Applications

This project can be applied in various scenarios, making it a versatile solution:

- **Backend Server for Headless WordPress Projects**: Use this setup as a robust backend for your headless WordPress projects, providing content via REST API or GraphQL.
- **Scalable Light WooCommerce Store**: Deploy a lightweight, scalable WooCommerce store that can handle varying levels of traffic without compromising performance.
- **Personal or Professional Blog**: Host a modern, feature-rich blog with the latest themes and plugins, ensuring a smooth and engaging user experience.
- **Content Management System (CMS)**: Utilize WordPress's powerful CMS capabilities to manage and deliver content across multiple platforms.
- **Portfolio Site**: Create a visually appealing and professional portfolio site with customizable themes and plugins.
- **Educational Platform**: Develop an online learning platform with WordPress and WooCommerce, integrating educational plugins for courses, quizzes, and more.
- **Non-Profit Organization Site**: Build a site for non-profit organizations, including donation handling and event management features.

## What is Vercel?

[Vercel](https://vercel.com/) is a platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database. It provides serverless functions, automatic scaling, and a global content delivery network.

## What is TiDB?

[TiDB](https://www.pingcap.com/tidb-serverless/) is a distributed SQL database that provides both traditional RDBMS and NoSQL functionalities. It offers horizontal scalability, strong consistency, and high availability, making it ideal for modern cloud applications.

## Included Plugins

By default, this repository includes the following plugins:

- [TiDB Compatibility](https://wordpress.org/plugins/tidb-compatibility/): Ensures compatibility between WordPress and the TiDB database. **This plugin is mandatory and cannot be removed.**
- [WooCommerce](https://woocommerce.com/): A powerful, extendable eCommerce plugin that helps you sell anything.
- [Query Monitor](https://wordpress.org/plugins/query-monitor/): The developer tools panel for WordPress.
- [WP CloudSync Master](https://wordpress.org/plugins/wp-cloudsync/): Offloads media from your WordPress content to the cloud.
- [WP GraphQL](https://www.wpgraphql.com/): Adds a GraphQL API to your WordPress site.
- [Cloudflare](https://wordpress.org/plugins/cloudflare/): Integrates Cloudflare services for improved security and performance.
- [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/): Ensures that emails sent from your WordPress site are delivered reliably.
- [GDPR Cookie Compliance](https://wordpress.org/plugins/gdpr-cookie-compliance/): Helps your site comply with GDPR cookie consent requirements.
- [Disable User Login](https://wordpress.org/plugins/disable-user-login/): Temporarily disable user logins without affecting administrators.
- [Temporary Login Without Password](https://wordpress.org/plugins/temporary-login-without-password/): Create temporary logins for testing or support purposes without a password.
- [Frontier Restrict Backend](https://wordpress.org/plugins/frontier-restrict-backend/): Restricts access to the WordPress backend.

You can modify the list to include plugins that best suit your needs, except for the TiDB Compatibility plugin which is required for the database integration.

## Known Limitations

Vercel limits the maximum size of all hosted files to 250MB. Since WordPress can be fairly heavy, you will need to choose what you install wisely. This isn't necessarily a bad thing, as many WordPress installations are bloated with unnecessary extensions.

## Setup

### Creating a TiDB Account and Getting DB Credentials

1. Go to the [TiDB Cloud](https://tidbcloud.com/) and sign up for an account.
2. Once logged in, create a new cluster by following the on-screen instructions.
3. After the cluster is created, navigate to the cluster details to get the following information:
    - Database Name
    - Host
    - User
    - Password

### Creating a Vercel Account and Project

1. Go to [Vercel](https://vercel.com/) and sign up for an account.
2. Click on "New Project" and import your repository from GitHub.
3. Follow the prompts to set up your project.
4. In the project settings, navigate to the "Environment Variables" section and add the following variables with the details from TiDB:

    ```sh
    WORDPRESS_DB_NAME=<your_db_name>
    WORDPRESS_DB_HOST=<your_db_host>
    WORDPRESS_DB_USER=<your_db_user>
    WORDPRESS_DB_PASSWORD=<your_db_password>
    WORDPRESS_DB_COLLATE=utf8mb4_general_ci
    WORDPRESS_DB_CHARSET=utf8mb4
    WORDPRESS_CONFIG_EXTRA=define('MYSQL_CLIENT_FLAGS', MYSQLI_CLIENT_SSL);
    define('RELOCATE',true);
    $_SERVER['HTTPS'] = 'on';
    ```

## Usage

### Forking the Repository

1. Fork this repository to your GitHub account by clicking the "Fork" button at the top right of the repository page.
2. Clone your forked repository to your local machine:

    ```sh
    git clone https://github.com/your-username/vercel-wordpress.git
    cd vercel-wordpress
    ```

3. Make any necessary modifications to the `plugins.txt` and `themes.txt` files to include the plugins and themes you need.

## Installation

### Installing Vercel Tools

1. Open your terminal or command prompt.
2. Install Vercel CLI:

    ```sh
    npm install -g vercel
    ```

### Deployment

To deploy the project, run the following command in your terminal:

```sh
vercel deploy --prod
```

### Adding Your Domain

1. Go to your Vercel dashboard.
2. Select your project and navigate to the "Domains" tab.
3. Click on "Add" and enter your custom domain.
4. Follow the instructions to configure your DNS settings with your domain registrar.

## Additional Information

- **Customizing Plugins and Themes**: Ensure your `plugins.txt` and `themes.txt` files contain the correct URLs to the zip files of the plugins and themes you want to use.
- **Updating Plugins and Themes**: Regularly update your plugins and themes to ensure compatibility and security.
- **Monitoring Usage**: Monitor your usage on both Vercel and TiDB Cloud to stay within free tier limits and avoid unexpected charges.
- **Security Considerations**: Always keep your WordPress installation, plugins, and themes up to date to protect against vulnerabilities.
