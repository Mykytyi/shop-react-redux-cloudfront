"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentService = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const path = './resources/build';
class DeploymentService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const hostingBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 'FrontendBucket', {
            blockPublicAccess: aws_cdk_lib_1.aws_s3.BlockPublicAccess.BLOCK_ALL
        });
        const distribution = new aws_cdk_lib_1.aws_cloudfront.Distribution(this, 'CloudfrontDistribution', {
            defaultBehavior: {
                origin: aws_cdk_lib_1.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(hostingBucket),
                viewerProtocolPolicy: aws_cdk_lib_1.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
            },
            defaultRootObject: 'index.html',
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html'
                }
            ]
        });
        new aws_cdk_lib_1.aws_s3_deployment.BucketDeployment(this, 'BucketDeployment', {
            sources: [aws_cdk_lib_1.aws_s3_deployment.Source.asset(path)],
            destinationBucket: hostingBucket,
            distribution,
            distributionPaths: ['/*']
        });
        new aws_cdk_lib_1.CfnOutput(this, 'CloudFrontURL', {
            value: distribution.domainName,
            description: 'The distribution URL',
            exportName: 'CloudfrontURL'
        });
        new aws_cdk_lib_1.CfnOutput(this, 'BucketName', {
            value: hostingBucket.bucketName,
            description: 'The name of the S3 bucket',
            exportName: 'BucketName'
        });
    }
}
exports.DeploymentService = DeploymentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVwbG95bWVudC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQU1vQjtBQUNwQiwyQ0FBc0M7QUFFdEMsTUFBTSxJQUFJLEdBQUcsbUJBQW1CLENBQUE7QUFFaEMsTUFBYSxpQkFBa0IsU0FBUSxzQkFBUztJQUMvQyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN2QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRWhCLE1BQU0sYUFBYSxHQUFHLElBQUksb0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQy9ELGlCQUFpQixFQUFFLG9CQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUztTQUNyRCxDQUFDLENBQUE7UUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLDRCQUFjLENBQUMsWUFBWSxDQUNuRCxJQUFJLEVBQ0osd0JBQXdCLEVBQ3hCO1lBQ0MsZUFBZSxFQUFFO2dCQUNoQixNQUFNLEVBQ0wsb0NBQXNCLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUM1RCxhQUFhLENBQ2I7Z0JBQ0Ysb0JBQW9CLEVBQ25CLDRCQUFjLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCO2FBQ3REO1lBQ0QsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixjQUFjLEVBQUU7Z0JBQ2Y7b0JBQ0MsVUFBVSxFQUFFLEdBQUc7b0JBQ2Ysa0JBQWtCLEVBQUUsR0FBRztvQkFDdkIsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDL0I7YUFDRDtTQUNELENBQ0QsQ0FBQTtRQUVELElBQUksK0JBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ2hFLE9BQU8sRUFBRSxDQUFDLCtCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsaUJBQWlCLEVBQUUsYUFBYTtZQUNoQyxZQUFZO1lBQ1osaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDekIsQ0FBQyxDQUFBO1FBRUYsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDcEMsS0FBSyxFQUFFLFlBQVksQ0FBQyxVQUFVO1lBQzlCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsVUFBVSxFQUFFLGVBQWU7U0FDM0IsQ0FBQyxDQUFBO1FBRUYsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDakMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxVQUFVO1lBQy9CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsVUFBVSxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUNEO0FBbERELDhDQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdGF3c19jbG91ZGZyb250LFxuXHRhd3NfY2xvdWRmcm9udF9vcmlnaW5zLFxuXHRhd3NfczMsXG5cdGF3c19zM19kZXBsb3ltZW50LFxuXHRDZm5PdXRwdXRcbn0gZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJ1xuXG5jb25zdCBwYXRoID0gJy4vcmVzb3VyY2VzL2J1aWxkJ1xuXG5leHBvcnQgY2xhc3MgRGVwbG95bWVudFNlcnZpY2UgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuXHRjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG5cdFx0c3VwZXIoc2NvcGUsIGlkKVxuXG5cdFx0Y29uc3QgaG9zdGluZ0J1Y2tldCA9IG5ldyBhd3NfczMuQnVja2V0KHRoaXMsICdGcm9udGVuZEJ1Y2tldCcsIHtcblx0XHRcdGJsb2NrUHVibGljQWNjZXNzOiBhd3NfczMuQmxvY2tQdWJsaWNBY2Nlc3MuQkxPQ0tfQUxMXG5cdFx0fSlcblxuXHRcdGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBhd3NfY2xvdWRmcm9udC5EaXN0cmlidXRpb24oXG5cdFx0XHR0aGlzLFxuXHRcdFx0J0Nsb3VkZnJvbnREaXN0cmlidXRpb24nLFxuXHRcdFx0e1xuXHRcdFx0XHRkZWZhdWx0QmVoYXZpb3I6IHtcblx0XHRcdFx0XHRvcmlnaW46XG5cdFx0XHRcdFx0XHRhd3NfY2xvdWRmcm9udF9vcmlnaW5zLlMzQnVja2V0T3JpZ2luLndpdGhPcmlnaW5BY2Nlc3NDb250cm9sKFxuXHRcdFx0XHRcdFx0XHRob3N0aW5nQnVja2V0XG5cdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdHZpZXdlclByb3RvY29sUG9saWN5OlxuXHRcdFx0XHRcdFx0YXdzX2Nsb3VkZnJvbnQuVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFNcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdFJvb3RPYmplY3Q6ICdpbmRleC5odG1sJyxcblx0XHRcdFx0ZXJyb3JSZXNwb25zZXM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRodHRwU3RhdHVzOiA0MDQsXG5cdFx0XHRcdFx0XHRyZXNwb25zZUh0dHBTdGF0dXM6IDIwMCxcblx0XHRcdFx0XHRcdHJlc3BvbnNlUGFnZVBhdGg6ICcvaW5kZXguaHRtbCdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHQpXG5cblx0XHRuZXcgYXdzX3MzX2RlcGxveW1lbnQuQnVja2V0RGVwbG95bWVudCh0aGlzLCAnQnVja2V0RGVwbG95bWVudCcsIHtcblx0XHRcdHNvdXJjZXM6IFthd3NfczNfZGVwbG95bWVudC5Tb3VyY2UuYXNzZXQocGF0aCldLFxuXHRcdFx0ZGVzdGluYXRpb25CdWNrZXQ6IGhvc3RpbmdCdWNrZXQsXG5cdFx0XHRkaXN0cmlidXRpb24sXG5cdFx0XHRkaXN0cmlidXRpb25QYXRoczogWycvKiddXG5cdFx0fSlcblxuXHRcdG5ldyBDZm5PdXRwdXQodGhpcywgJ0Nsb3VkRnJvbnRVUkwnLCB7XG5cdFx0XHR2YWx1ZTogZGlzdHJpYnV0aW9uLmRvbWFpbk5hbWUsXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBkaXN0cmlidXRpb24gVVJMJyxcblx0XHRcdGV4cG9ydE5hbWU6ICdDbG91ZGZyb250VVJMJ1xuXHRcdH0pXG5cblx0XHRuZXcgQ2ZuT3V0cHV0KHRoaXMsICdCdWNrZXROYW1lJywge1xuXHRcdFx0dmFsdWU6IGhvc3RpbmdCdWNrZXQuYnVja2V0TmFtZSxcblx0XHRcdGRlc2NyaXB0aW9uOiAnVGhlIG5hbWUgb2YgdGhlIFMzIGJ1Y2tldCcsXG5cdFx0XHRleHBvcnROYW1lOiAnQnVja2V0TmFtZSdcblx0XHR9KVxuXHR9XG59XG4iXX0=