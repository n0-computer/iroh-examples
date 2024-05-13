# S3-store

This is an example how to use iroh-blobs to serve content from the web,
e.g. from an s3 bucket.

This works by downloading the content and computing an outboard in memory.
The data itself remains remote. The upside is that the data is now content-addressed,
so any change will be immediately detected and will lead to a failure to serve
the content, just as if the changed data was not there at all.

# serve-urls

This just takes a list of urls and serves them all as a collection.

# serve-s3

This scans the index xml of a s3 bucket and creates a collection from it.
To use this, you must configure or find a public s3 bucket with a index enabled.

Below an example bucket policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::__my-bucket-name__/*"
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::__my-bucket-name__"
        }
    ]
}
```
